import {
  BuyerProduct,
  LineItem,
  OrderPromotion,
  MeUser,
  Order,
  Payment,
  PriceSchedule,
  OrderWorksheet,
  Address,
  Subscription,
  OrderCalculateResponse,
} from 'ordercloud-javascript-sdk'

export type PaymentWithXp = Payment<PaymentXp, TransactionsXp>
export type PriceScheduleWithXp = PriceSchedule<PriceScheduleXp>
export type LineItemWithXp = LineItem<LineItemXp, ProductXp>
export type OrderPromotionWithXp = OrderPromotion<OrderPromotionXp>
export type BuyerProductWithXp = BuyerProduct<BuyerProductXP, PriceScheduleXp>
export type OrderWithXp = Order<OrderXp, UserXP>
export type MeUserWithXp = MeUser<UserXP>
export type AddressWithXp = Address<AddressXp>
export type SubscriptionWithXp = Subscription<SubscriptionXp>
export type OrderCalculateResponseWithXp = OrderCalculateResponse<
  OrderCalculateResponseXp,
  ProductXp
>
export type OrderWorksheetWithXP = OrderWorksheet<
  UserXP,
  AddressXp,
  OrderXp,
  ProductXp,
  VariantXP,
  AddressXp,
  AddressXp,
  LineItemXp,
  OrderPromotionXp,
  OrderCalculateResponseXp
>

export interface PickupInfo {
  StoreId: string
  FirstName: string
  LastName: string
  Email: string
  PhoneNumber: string
  IsMobile: boolean
  SelfPickup: boolean
  SpecialInstruction: string
}

export interface DeliveryAddress {
  ID?: string
  CompanyName?: string
  FirstName?: string
  LastName?: string
  Street1?: string
  Street2?: string
  City?: string
  State?: string
  Zip?: string
  Country?: string
  Phone?: string
  AddressName?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PaymentXp {
  //
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TransactionsXp {
  //
}

export interface OrderXp {
  email?: string
}

export interface EmailContent {
  ListPrice?: number
  SalePrice?: number
  CouponDiscount?: number
  AutoshipDiscount?: number
  TotalMemberSaving?: number
  Subtotal?: number
  Tax?: number
  Coupons?: {
    Coupon: string
    CouponCode: string
    CouponDiscount: string
    CouponType: number
  }[]
}
export interface OrderPromotionXp {
  EvaluationType?: string
  CategoryPromotion?: boolean
  IsPLU?: boolean
  OfferId?: string
  CompanyId?: string
  PeriodDiscountType?: number
  IsGlobalPromotion?: boolean
  OptOut?: string[]
}
export interface LineItemXp {
  model: string
  mobile?: number
  location: string
  color: string
  dealer?: string
  bookingAmount: number
  buyingPlan?: string
  selectedModel?: string
  selectedColor?: string
  dealership: string
  name: string
  email: string
  contact: string
}

export interface ProductXpImage {
  Name?: string
  Position?: number
  Url?: string
}
export interface PromoTagXp {
  IgnoreDataAreaId?: boolean
  IgnorePriceGroup?: boolean
  DataAreaId?: string
  PriceGroup?: string
  Text: string
  OfferId?: string
  Priority?: number
}

export interface ProductXp {
  Range: string
  TopSpeed: string
  Charger: string
  BodyType: string
  IP67RatedWaterResistance: boolean
  ChargingTime: string
  Brakes: string
  Display: string
  BatteryCapacity: string
  Colour: { [key: string]: string }[]
  Reverse: boolean
  SelfCancellingBlinker: string
  AutoHazardLight: boolean
  CallAcceptReject: boolean
  HelmetBox: string
  FrontStorage: string
  StandardWarranty: string
  AdditionalRideModes: string[]
  MusicControl: boolean
  HillHold: boolean
  SequentialRearBlinker: boolean
  GuideMeHomeLights: boolean
  DisplayThemeChange: boolean
  AppConnectivity: string
  Navigation: string
  RemoteImmobilization: boolean
  OverSpeedAlert: boolean
  AccidentDetection: boolean
  NotificationAlert: boolean
  TripDataAnalytics: boolean
  DocumentStorage: boolean
  GeoFencing: boolean
  Engine?: string
  MaxTorque?: string
  Gradeability?: string
  Variant?: string
  CertifiedRange?: string
  MaxPower?: string
  DriveModes?: string
  EngineType?: string
  Displacement?: string
  RearSuspension?: string
  FuelTank?: string
  Bullets?: string[]
  Images: { Url?: string; Position?: number }[]
  GalleryImages?: { Url?: string }[]
  AdditionalImages: {
    BackgroundImage: string
    GeoFacing: string
    MusicControl: string
    RemoteImmobilization: string
    HillHold: string
    Display: string
    OverSpeedAlert: string
    Light: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VariantXP {}

export interface BuyerProductXP extends ProductXp {
  PriceSchedule?: PriceSchedule
}

export interface PriceScheduleXp {
  ListPrice?: number
  PPCPrice?: number
  IMapPrice?: number
}

export interface UserXP {
  AdyenShopperReference?: string
  ReceivedFirstTimeAutoshipDiscount?: boolean
  LoyaltyAccepted?: boolean
  LoyaltyAcceptedOn?: string
  UnityId?: string
  HomeNumber?: string
  DeliveryInstruction?: string
  PickupInstruction?: string
  HomePhone?: string
  IsMobile?: boolean
  CartUser?: boolean
  Pets?: Record<string, string[]>
  pets?: Record<string, string[]>
  FirstLogin?: boolean
  PPC?: string
  WebId?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AddressXp {}

export interface SubscriptionXp {
  OriginalOrderId?: string
  Site?: string
  DeliveryAddress?: AddressWithXp
  Fulfillment?: string
  CardEndingIn?: string
  CardExpiry?: string
  CardType?: string
  CustomerType?: string
  PPC?: string
  Email?: string
  ExpectedDeliveryDate?: string
  AdjustmentDate?: string
  CancellationReason?: string
}

export interface OrderCalculateResponseXp {
  TaxDetails?: TaxDetails
}
export interface TaxDetails {
  OrderID?: string
  TotalTax?: number
  LineItems?: LineItems[]
}
export interface LineItems {
  LineItemID?: string
  LineItemTotalTax?: number
}
