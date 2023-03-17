import json
import os
import openai

openai.api_key = os.environ["OPENAI_API_KEY"]

def generate_chat_gpt4_response(prompt):
    response = openai.Completion.create(
        engine="gpt-4-32k-0314",
        prompt=prompt,
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.2,
    )
    return response.choices[0].text.strip()

def expand_text(text):
    prompt = f"Expand the following short text into a more formal length with a friendly tone: '{text}'"
    expanded_text = generate_chat_gpt4_response(prompt)
    return expanded_text

def fix_spelling(text):
    prompt = f"Fix the spelling mistakes in the following text: '{text}'"
    fixed_text = generate_chat_gpt4_response(prompt)
    return fixed_text

def summarize_conversation(text):
    prompt = f"Summarize the following conversation in a concise and clear way: '{text}'"
    summary = generate_chat_gpt4_response(prompt)
    return summary

def lambda_handler(event, context):
    params = event.get('body')
    if type(params) == str:
        params = json.loads(event.get('body'))

    action = params['action']
    text = params['text']

    if action == 'expand':
        response = expand_text(text)
    elif action == 'fix':
        response = fix_spelling(text)
    elif action == 'summarize':
        response = summarize_conversation(text)
    else:
        response = {'error': 'Invalid action'}

    return {
        'statusCode': 200,
        'body': json.dumps({ 'response': response })
    }
