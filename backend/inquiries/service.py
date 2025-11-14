from sqlalchemy.orm import Session
from inquiries.schemas import InquiryCreate, InquiryResponse
from core.models import Inquiry
from core.logger import logger


def create_inquiry(db: Session, inquiry_data: InquiryCreate) -> InquiryResponse:
    inquiry = Inquiry(
        name=inquiry_data.name,
        email=inquiry_data.email,
        phone=inquiry_data.phone,
        company=inquiry_data.company,
        message=inquiry_data.message,
        service_type=inquiry_data.serviceType,
        selected_features=inquiry_data.selectedFeatures,
        additional_features=inquiry_data.additionalFeatures,
        estimated_price=inquiry_data.estimatedPrice,
        status="pending"
    )
    
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    
    logger.info(f"Inquiry created with id: {inquiry.id}")
    
    return InquiryResponse.model_validate(inquiry)

