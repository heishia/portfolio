import logging
import sys
from core.config import settings


def setup_logger() -> logging.Logger:
    logger = logging.getLogger(settings.PROJECT_NAME)
    logger.setLevel(getattr(logging, settings.LOG_LEVEL.upper()))
    
    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(getattr(logging, settings.LOG_LEVEL.upper()))
    
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    handler.setFormatter(formatter)
    
    logger.addHandler(handler)
    return logger


logger = setup_logger()

