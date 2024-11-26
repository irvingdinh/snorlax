'use client';

export class ActionHelper {
  static returnError(
    error: unknown,
    defaultMessage: string = 'An unexpected error occurred.',
  ): { error: string } {
    return {
      error:
        error instanceof Error && 'message' in error
          ? error.message
          : defaultMessage,
    };
  }
}
