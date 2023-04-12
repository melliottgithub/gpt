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

# Fix grammar


def fix_spelling(text):
    prompt = f"Fix grammar: '{text}'"
    fixed_text = generate_chat_gpt4_response(prompt)
    return fixed_text

# Summarize a conversation in a concise and clear way


def summarize_conversation(text):
    prompt = f"Summarize the following conversation in a concise and clear way: '{text}'"
    summary = generate_chat_gpt4_response(prompt)
    return summary

# Perform sentiment analysis on a given text


def analyze_sentiment(text):
    prompt = f"Analyze the sentiment of the following text and classify it as positive, negative, or neutral: '{text}'"
    sentiment = generate_chat_gpt4_response(prompt)
    return sentiment

# Classify a given text into a predefined category


def classify_text(text):
    prompt = f"Classify the following text into a category: '{text}'"
    category = generate_chat_gpt4_response(prompt)
    return category

# Extract keywords from a given text


def extract_keywords(text):
    prompt = f"Extract the main keywords from the following text: '{text}'"
    keywords = generate_chat_gpt4_response(prompt)
    return keywords

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
        valid_actions = ['expand', 'fix', 'summarize',
                         'sentiment', 'classify', 'keywords']
        if action not in valid_actions:
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
        elif action == 'sentiment':
            response = analyze_sentiment(text)
        elif action == 'classify':
            response = classify_text(text)
        elif action == 'keywords':
            response = extract_keywords(text)

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
