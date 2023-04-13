import json
import os
import openai

# Set the OpenAI API key
openai.api_key = os.environ.get("OPENAI_API_KEY")


def generate_chat_gpt4_response(prompt):
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.2,
        )
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"API request failed: {e}")
        raise e


def expand_text(text):
    prompt = f"Rewrite the following short text into a longer, more detailed version while maintaining a friendly tone:\n\nText: {text}\n"
    return generate_chat_gpt4_response(prompt)


def fix_grammar(text):
    prompt = f"Correct any grammar errors in the text below and provide the revised version:\n\nOriginal text: {text}\n"
    return generate_chat_gpt4_response(prompt)


def summarize_conversation(text):
    prompt = f"Provide a clear and concise summary of the conversation below:\n\nConversation:\n{text}\n"
    return generate_chat_gpt4_response(prompt)


def analyze_sentiment(text):
    prompt = f"Examine the sentiment of the following text and determine if it is positive, negative, or neutral:\n\nText: {text}\n"
    return generate_chat_gpt4_response(prompt)


def classify_text(text):
    prompt = f"Determine the most appropriate category for the following text:\n\nText: {text}\n"
    return generate_chat_gpt4_response(prompt)


def extract_keywords(text):
    prompt = f"Identify the main keywords in the text below:\n\nText: {text}\n"
    return generate_chat_gpt4_response(prompt)


def lambda_handler(event, context):
    try:
        params = json.loads(event.get('body'))
        action = params.get('action')
        text = params.get('text')

        if not action or not text:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing parameters'})
            }

        valid_actions = ['expand', 'fix', 'summarize',
                         'sentiment', 'classify', 'keywords']
        if action not in valid_actions:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Invalid action'})
            }

        action_mapping = {
            'expand': expand_text,
            'fix': fix_grammar,
            'summarize': summarize_conversation,
            'sentiment': analyze_sentiment,
            'classify': classify_text,
            'keywords': extract_keywords
        }

        response = action_mapping[action](text)

        return {
            'statusCode': 200,
            'body': json.dumps({'response': response})
        }
    except Exception as e:
        print(f"Error occurred: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal server error'})
        }
