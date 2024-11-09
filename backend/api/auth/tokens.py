# auth/tokens.py

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth.models import User

def get_tokens_for_user(user):
    """
    Genererar access- och refreshtokens för en given användare.
    """
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def verify_access_token(token):
    """
    Verifierar en access-token. Returnerar antingen användarens information
    om tokenen är giltig, eller None om den är ogiltig.
    """
    try:
        access_token = AccessToken(token)
        user_id = access_token['user_id']
        user = User.objects.get(id=user_id)
        return user
    except Exception:
        return None

def blacklist_refresh_token(refresh_token_str):
    """
    Svartlistar en refresh-token så att den inte längre är giltig.
    Kräver att blacklisting är aktiverad i SIMPLE_JWT-inställningarna.
    """
    try:
        token = RefreshToken(refresh_token_str)
        token.blacklist()  # Detta fungerar endast om blacklisting är konfigurerad
        return True
    except Exception as e:
        print(f"Error blacklisting token: {e}")
        return False