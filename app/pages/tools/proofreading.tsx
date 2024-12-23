import process from 'node:process';

import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  Alert,
  Box,
  Button,
  Card,
  Code,
  Container,
  Divider,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import Joi from 'joi';
import { useCallback, useEffect, useState } from 'react';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';

import { AlertTriangleIcon } from '~/components/atoms/Icon';
import { Header } from '~/components/molecules/Header';
import { GtagService } from '~/services/gtag.service';
import { RecaptchaService } from '~/services/recaptcha.service';
import { UtilsService } from '~/services/utils.service';

export const meta: MetaFunction = () => {
  return [
    { title: 'Proofreading — Tools — Irving Dinh' },
    {
      property: 'og:title',
      content: 'Proofreading — Tools — Irving Dinh',
    },
    {
      name: 'description',
      content:
        "AI-powered proofreading assistant, I'm using `gemini-1.5-flash-8b` under the hood!",
    },
  ];
};

type ActionResult = {
  error?: string;
  data?: {
    output: string;
  };
};

export async function action({
  request,
}: ActionFunctionArgs): Promise<ActionResult> {
  try {
    const formData = await request.formData();

    const schema = Joi.object({
      'g-recaptcha-response': Joi.string().required(),
      prompt: Joi.string().max(1024).required(),
    });

    const { value, error } = schema.validate({
      'g-recaptcha-response': formData.get('g-recaptcha-response'),
      prompt: formData.get('prompt'),
    });
    if (error !== undefined) {
      return {
        error: error.message,
      };
    }

    try {
      await RecaptchaService.verify(value['g-recaptcha-response']);
    } catch (error) {
      console.log(error);
      return UtilsService.returnError(error);
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' });

    const prompt = `You're an expert in English, please help proofreading this following content. Your answer should include the revised version of the content, nothing else. The content is """${value.prompt}"""`;
    const result = await model.generateContent(prompt);

    return {
      data: {
        output: result.response.text(),
      },
    };
  } catch (error) {
    console.error(error);

    return {
      error: 'Oops, something went wrong! Please try again.',
    };
  }
}

export default function Page() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const [data, setData] = useState<typeof actionData>();
  const [recaptchaToken, setRecaptchaToken] = useState<string>();
  const [refreshRecaptcha, setRefreshRecaptcha] = useState(false);

  useEffect(() => {
    setData(actionData);

    GtagService.event({
      action: 'receive',
      category: 'tools',
      label: 'proofreading',
    });
  }, [actionData]);

  const updateRecaptchaToken = useCallback((token: string) => {
    setRecaptchaToken(token);
  }, []);

  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Header />

      <GoogleReCaptcha
        onVerify={updateRecaptchaToken}
        refreshReCaptcha={refreshRecaptcha}
      />

      <Container mt="lg">
        <Stack gap="lg">
          <Box>
            <Title order={2}>Proofreading</Title>

            <Text c="dimmed">
              AI-powered proofreading assistant, I&#39;m using{' '}
              <Code>gemini-1.5-flash-8b</Code> under the hood!
            </Text>
          </Box>

          <Form
            method="POST"
            onSubmit={() => {
              setData(undefined);
              setRefreshRecaptcha((v) => !v);

              GtagService.event({
                action: 'submit',
                category: 'tools',
                label: 'proofreading',
              });
            }}
          >
            {recaptchaToken !== undefined && (
              <input
                type="hidden"
                name="g-recaptcha-response"
                value={recaptchaToken}
              />
            )}

            <Stack>
              <Textarea
                label="Content"
                rows={6}
                withAsterisk
                description="The content to be proofread."
                placeholder="I'm Irving Dinh, an software enginer based on Ho Chi Minh City, Viet Nam"
                name="prompt"
                disabled={isSubmitting}
                required
              />

              <Button type="submit" variant="filled" loading={isSubmitting}>
                Submit
              </Button>
            </Stack>
          </Form>

          {data !== undefined && data.data !== undefined && (
            <>
              <Divider variant="dashed" label="Output" />

              <Card shadow="sm" padding="lg" radius="md">
                <Text>{data.data.output}</Text>
              </Card>
            </>
          )}

          {data !== undefined && data.error !== undefined && (
            <Alert
              variant="light"
              color="red"
              title="Error"
              icon={<AlertTriangleIcon />}
            >
              {data.error}
            </Alert>
          )}
        </Stack>
      </Container>
    </>
  );
}
