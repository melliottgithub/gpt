FROM public.ecr.aws/lambda/python:3.8

COPY src/ /var/task/

RUN pip install --upgrade pip && \
    pip install openai

CMD ["lambda_handler.lambda_handler"]
