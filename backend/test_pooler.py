from core.config import settings

print("=== Current Settings ===")
print(f"user: {settings.user}")
print(f"host: {settings.host}")
print(f"use_pooler: {settings.use_pooler}")
print(f"\nGenerated DATABASE_URL:")
print(settings.get_database_url())

