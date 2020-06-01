export class RequestProduct {
  constructor(ProductID: number, ProductCode: string, ProductName: string,
    Quantity: number, Unit: string, DeliveryDate: string, DeliveryAddress: string, Status: number) {
    this.ProductID = ProductID;
    this.ProductName = ProductName;
    this.ProductCode = ProductCode;
    this.Quantity = Quantity;
    this.Unit = Unit;
    this.DeliveryDate = DeliveryDate;
    this.DeliveryAddress = DeliveryAddress;
    this.Status = Status;
  }
  public ProductID: number;
  public ProductName: string;
  public ProductCode: string;
  public Quantity: number;
  public Unit: string;
  public DeliveryDate: string;
  public DeliveryAddress: string;
  public Status: number;
}
