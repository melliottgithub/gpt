# GPT-4 Lambda Function

This AWS Lambda function uses the OpenAI GPT-4 model to perform various natural language processing tasks, such as expanding text, fixing spelling, summarizing conversations, sentiment analysis, text classification, and keyword extraction.

## Features

The Lambda function supports the following features:

1. Expand Text: Expand a short text into a more formal length with a friendly tone.
2. Fix Spelling: Fix spelling mistakes in a given text.
3. Summarize Conversation: Summarize a conversation in a concise and clear way.
4. Sentiment Analysis: Determine the sentiment of a given text (positive, negative, or neutral).
5. Text Classification: Classify a given text into one or more predefined categories.
6. Keyword Extraction: Extract relevant keywords from a given text.

## Usage

To use this Lambda function, you need to send a JSON object containing two parameters:

- `action`: The desired feature to be executed. Possible values are 'expand', 'fix', 'summarize', 'sentiment', 'classify', or 'keywords'.
- `text`: The input text to be processed.

### Example Request and Response

```json
{
  "action": "expand",
  "text": "I'm going to the store."
}

{
  "response": "I am planning to visit the store to do some shopping."
}
```
## Deployment

This Lambda function can be deployed using AWS CLI and GitHub Actions. The provided `requirements.txt` contains the necessary dependencies for the Lambda function.

Follow these steps to deploy the Lambda function:

1. Create a new GitHub repository to store your code.
2. Add the Python code, `requirements.txt`, and the `README.md` to your repository.
3. Set up GitHub Actions to automatically deploy your Lambda function upon pushing to the main branch. You can use the provided GitHub Actions YAML file as a reference for setting up the deployment workflow.
4. Ensure you have the AWS CLI installed and configured with your AWS account credentials.
5. Create an AWS Lambda function in your desired region.
6. Replace the function name and region in the GitHub Actions YAML file with your Lambda function name and desired region.
7. Push your code to the GitHub repository. The deployment process will be triggered automatically.

For detailed deployment steps, refer to the main README file of this repository and the AWS Lambda documentation.

## Dependencies

- `openai`: The OpenAI Python library is used for interacting with the GPT-4 model. This library is listed in the `requirements.txt` file and will be automatically installed during the deployment process.
