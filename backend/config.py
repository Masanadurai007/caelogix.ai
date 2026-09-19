from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    secret_key: str = "dev-secret-key"
    environment: str = "development"

    database_url: str = "postgresql+psycopg2://caelogix:caelogix@localhost:5432/caelogix"

    cors_origins: str = "http://localhost:5173"

    groq_api_key: str = ""
    chat_model: str = "llama-3.3-70b-versatile"

    admin_username: str = "admin"
    admin_password: str = "change-me"

    smtp_user: str = ""
    smtp_app_password: str = ""

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
