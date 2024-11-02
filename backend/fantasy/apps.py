# fantasy/apps.py
from django.apps import AppConfig

class FantasyConfig(AppConfig):
    name = 'fantasy'

    def ready(self):
        # Import signals here to ensure they are registered when Django starts
        import fantasy.signals
