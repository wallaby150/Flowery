from flowery import db
from sqlalchemy import Column, Integer, String, ForeignKey, Text, Date
from sqlalchemy.orm import relationship

from datetime import datetime


class Flowers(db.Model):
    
    __tablename__ = 'flowers'
    
    flower_id = Column(Integer, primary_key=True)
    flower_name = Column(String(30))
    

class Sales(db.Model):
    
    __tablename__ = 'sales'
    
    sales_id = Column(Integer, primary_key=True, autoincrement=True)
    flower_id = Column(Integer)
    reservation_id = Column(Integer)
    sale_date = Column(Date, default=datetime.now().date())
    count = Column(Integer)
    

class Myflowers(db.Model):
    
    __tablename__ = 'myflowers'
    
    myflowers_id = Column(Integer, primary_key=True, autoincrement=True)
    message_id = Column(String(50))
    mean_id = Column(Integer)