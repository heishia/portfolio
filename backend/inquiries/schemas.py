from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    message: Optional[str] = None
    serviceType: Optional[str] = Field(None, alias="service_type")
    selectedFeatures: Optional[List[str]] = Field(None, alias="selected_features")
    additionalFeatures: Optional[str] = Field(None, alias="additional_features")
    estimatedPrice: Optional[int] = Field(None, alias="estimated_price")
    
    class Config:
        populate_by_name = True


class InquiryResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    company: Optional[str] = None
    message: Optional[str] = None
    serviceType: Optional[str] = Field(None, alias="service_type")
    selectedFeatures: Optional[List[str]] = Field(None, alias="selected_features")
    additionalFeatures: Optional[str] = Field(None, alias="additional_features")
    estimatedPrice: Optional[int] = Field(None, alias="estimated_price")
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True
        populate_by_name = True


class InquiryCreateResponse(BaseModel):
    id: int
    message: str = "Inquiry submitted successfully"

