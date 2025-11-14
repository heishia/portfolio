from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from inquiries.service import create_inquiry
from inquiries.schemas import InquiryCreate, InquiryCreateResponse

router = APIRouter(prefix="/inquiries", tags=["inquiries"])


@router.post("", response_model=InquiryCreateResponse, status_code=201)
def submit_inquiry(
    inquiry_data: InquiryCreate,
    db: Session = Depends(get_db)
) -> InquiryCreateResponse:
    inquiry = create_inquiry(db, inquiry_data)
    return InquiryCreateResponse(id=inquiry.id)

