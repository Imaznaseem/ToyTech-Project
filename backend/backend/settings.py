from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
import os

# Ladda miljövariabler från en .env-fil
load_dotenv()

# Grundläggande inställningar
BASE_DIR = Path(__file__).resolve().parent.parent

# Säkerhet
SECRET_KEY = os.getenv('SECRET_KEY', 'default-secret-key')  # Använd en miljövariabel för att lagra hemlig nyckel
DEBUG = os.getenv('DEBUG', 'True') == 'False'  # Styr DEBUG-läge via en miljövariabel
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '*').split(',')  # Tillåt flera hosts via miljövariabel

# Django Rest Framework inställningar
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

# Sessionsinställningar
SESSION_COOKIE_HTTPONLY = True  # Gör session-cookien endast tillgänglig för servern
SESSION_COOKIE_SECURE = False  # Kräver HTTPS (använd endast om du kör i en säker miljö)
CSRF_COOKIE_HTTPONLY = False  # Gör CSRF-cookies otillgängliga för JavaScript
CSRF_COOKIE_SECURE = False  # Kräver HTTPS
SESSION_COOKIE_SAMESITE = 'Lax'  # Lägg till här
CSRF_COOKIE_SAMESITE = 'Lax'  # Lägg till här

SESSION_ENGINE = "django.contrib.sessions.backends.db"  # Default session backend



# JWT inställningar för token-livslängd
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "BLACKLIST_AFTER_ROTATION": True,
}

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "api",
    "rest_framework",
    "corsheaders",  # Lägg till corsheaders för att hantera CORS
    'rest_framework_simplejwt.token_blacklist',
]

# Middleware
MIDDLEWARE = [
    'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Placera corsheaders-middleware tidigt
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Möjlighet att lägga till anpassade mallar i templates-mappen
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Databasinställningar
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Lösenordshantering
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationella inställningar
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Statiska och mediafiler
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Standardvärde för primär nyckelfält
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWS_CREDENTIALS = True

# CORS-inställningar
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173'
]
CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    'http://localhost:3000'
]

# E-postinställningar
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.your-email-provider.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True') == 'True'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', 'your-email@example.com')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', 'your-email-password')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
