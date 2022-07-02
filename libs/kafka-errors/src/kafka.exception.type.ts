export type KafkaExceptionType = {
  code: number;
  message: string;
};

export type KafkaErrorType = {
  stack: string;
  code: number;
  message: string;
  status: 'error';
};
