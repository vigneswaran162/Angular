export class BookingPracelModel{
    DocNo: any ;
    DocDate:string;
    FormBranchCode:string;
    ToBranchCode:string;
    PaymentMode:string;
    TotalAmount:number;
    FreightAmount:number;
    UserCode:number;
    FromPlace:string;
    FromName:string;
    FromPhoneNo: string;
    FromGSTNo: string;
    ToPlace:string;
    ToName:string;
    ToPhoneNo: string;
    ToGSTNo: string;
    Cancel: string;
    CanceledBy:string;
    Void: string;
    createdBy: string;
    updatedBy: string;
    voidedBy: string;
    BookingDet:BookingPracelDetModel[]
    OpsType:string;
    Status:string;
}

export class BookingPracelDetModel{
    DocNo: string ;
    DocDate:string;
    PaymentMode:string;
    UserCode: string;
    Article: string;
    Description: string;
    ItemValue: string;
    Weight: string;
    Rate:string;
    Quantity: string;
    Discount: string;
    TotalAmount:number;
    FreightAmount: number;
    Cancel: string;
    CanceledBy:string;
    Void: string;
    createdBy: string;
    updatedBy: string;
    voidedBy: string;
    FormBranchCode:string;
    ToBranchCode:string;
    Status:string;
}