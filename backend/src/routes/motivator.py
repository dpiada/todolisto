import requests
from fastapi import APIRouter

router = APIRouter()

@router.get("/motivation")
def get_motivation():
    api_url = 'https://dummyjson.com/quotes/random'
    
    try:
        response = requests.get(api_url)
        response.raise_for_status() 

        data = response.json()
    
        if 'quote' in data and 'author' in data:
            return {
                "quote": data['quote'],
                "author": data['author']
            }
            
        raise Exception
    
    except Exception as e:
        print(f"Error fetching motivation quote: {e}")
        return {
                "quote": "No way, bro!",
                "author": "dpiada"
            }