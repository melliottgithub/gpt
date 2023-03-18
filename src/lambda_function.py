import json
import os
import openai

# Set the OpenAI API key
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Generate a response using the GPT-4 model


def generate_chat_gpt4_response(prompt):
    try:
        # Send a request to the OpenAI API
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.2,
        )
        # Return the response text
        return response.choices[0].text.strip()
    except Exception as e:
        # Log the error and re-raise the exception
        print(f"API request failed: {e}")
        raise e

# Expand a short text into a more formal length with a friendly tone


def expand_text(text):
    prompt = f"Expand the following short text into a more formal length with a friendly tone: '{text}'"
    expanded_text = generate_chat_gpt4_response(prompt)
    return expanded_text

# Fix spelling mistakes in a text


def fix_spelling(text):
    prompt = f"Fix the spelling mistakes in the following text: '{text}'"
    fixed_text = generate_chat_gpt4_response(prompt)
    return fixed_text

# Summarize a conversation in a concise and clear way


def summarize_conversation(text):
    prompt = f"Summarize the following conversation in a concise and clear way: '{text}'"
    summary = generate_chat_gpt4_response(prompt)
    return summary

# Handle the Lambda function event


def lambda_handler(event, context):
    try:
        # Parse the input parameters from the event body
        params = json.loads(event.get('body'))
        action = params.get('action')
        text = params.get('text')

        # Check if the required parameters are present and not empty
        if not action or not text:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing parameters'})
            }

        # Check if the action parameter is valid
        if action not in ['expand', 'fix', 'summarize']:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Invalid action'})
            }

        # Call the appropriate function based on the action parameter
        if action == 'expand':
            response = expand_text(text)
        elif action == 'fix':
            response = fix_spelling(text)
        elif action == 'summarize':
            response = summarize_conversation(text)

        # Return the response in a JSON format
        return {
            'statusCode': 200,
            'body': json.dumps({'response': response})
        }
    except Exception as e:
        # Log the error and return a generic error message
        print(f"Error occurred: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal server error'})
        }
