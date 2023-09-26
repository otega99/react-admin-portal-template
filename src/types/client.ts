/**
 * This contains the types associated with the endpoints.
 */

/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
module Api {
  export type Status =
    | 'pending'
    | 'successful'
    | 'confirmed'
    | 'canceled'
    | 'booked'
    | 'confirming';

  export type Country = 'USD' | 'EUR' | 'GBP' | 'NGN';

  export interface AdminI {
    id: number;
    profilePicturePath: null | string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: number;
    status: number;
    address: null | string;
    lastLogin: null | string;
  }

  export interface PageInfo {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }

  export namespace RolesAndPermissions {

    
    export interface Response extends Responses.BaseResponse {
      data: Permission[];
    }

    export interface Rights {
      rightid: string;
      rightname: string;
      status: boolean;
    }
    
    export interface Permission {
      roleid: string;
      rolename: string;
      authority: string;
      countofusers: number;
      permissions: Rights[];
    }
  }

  export namespace Responses {
    export interface BaseResponse {
      code: number;
      message: string;
    }

    interface ErrorMessageData {
      message: string;
      property: string;
    }

    export interface Error extends BaseResponse {
      data: ErrorMessageData[] | string;
    }
  }

  export namespace Admin {
    export namespace Login {
      interface DataI {
        accessToken: string;
      }

      export interface Request {
        emailAddress: string;
        password: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: DataI;
      }
    }

    export namespace ForgotPassword {
      export interface Request {
        emailAddress: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: null | string;
      }
    }

    export namespace ResetPassword {
      export interface Request {
        Token: string;
        Password: string;
        ConfirmPassword: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: null | string;
      }
    }

    export namespace ChangePassword {
      export interface Request {
        token: string;
        emailAddress: string;
        oldPassword: string;
        password: string;
        confirmPassword: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: null | string;
      }
    }

    export namespace UpdateAdmin {
      export interface Request {
        token: string;
        phoneNumber: string;
        emailAddress: string;
        address: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: null | string;
      }
    }

    export namespace CurrentUser {
      export interface Request {
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: AdminI;
      }
    }
  }

  export namespace Admins {
    export namespace GetAllUsers {
      export interface Request {
        PageNumber: number;
        PageSize: number;
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: AdminI[];
        pageInfo: PageInfo;
      }
    }

    export namespace GetSingleAdmin {
      export interface Request {
        token: string;
        id: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: AdminI;
      }
    }

    export namespace AddAdmin {
      export interface Request {
        token: string;
        ProfilePicture: string;
        EmailAddress: string;
        PhoneNumber: string;
        FirstName: string;
        LastName: string;
        Address: string;
        Password: string;
        RoleId:number;
      }

      export interface Response extends Responses.BaseResponse {
        data: string | null;
      }
    }

    export namespace BlockAdmin {
      export interface Request {
        token: string;
        id: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: string | null;
      }
    }

    export namespace UnBlockAdmin {
      export interface Request {
        token: string;
        id: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: string | null;
      }
    }

    export namespace DeleteAdmin {
      export interface Request {
        token: string;
        id: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: string | null;
      }
    }
  }

  export namespace Transactions {
    export namespace GetTransactions {
      export interface TransactionI {
        amount: number;
        buy: string;
        name: string;
        paymentId: string;
        rate: number;
        sell: string;
        status: string;
      }

      export interface Request {
        PageNumber: number;
        PageSize: number;
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: TransactionI[];
        pageInfo: PageInfo;
      }
    }

    export namespace GetTransactionsByOwnerId {
      export interface TransactionI {
        amount: number;
        buy: string;
        name: string;
        paymentId: string;
        rate: number;
        sell: string;
        status: string;
      }

      export interface Request {
        id: string;
        PageNumber: number;
        PageSize: number;
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: TransactionI[];
        pageInfo: PageInfo;
      }
    }

    export namespace GetSingleTransaction {
      export interface TransactionI {
        amountGotten: number;
        amountSold: number;
        bankFees: number;
        buy: string;
        customerAccount: string;
        customerName: string;
        paymentDate: string;
        paymentType: string;
        processingFee: number;
        purposeOfId: string;
        rate: number;
        respectedFxAccount: string;
        sell: string;
        status: string;
      }

      export interface Request {
        txRef: string;
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: TransactionI;
      }
    }

    export namespace ApproveTransaction {
      export interface Request {
        txRef: string;
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: string | null;
      }
    }

    export namespace CancelTransaction {
      export interface Request {
        txRef: string;
        token: string;
        reason: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: string | null;
      }
    }

    export namespace RecentExchangeOrders {
      export interface OrderI {
        date: string;
        txRef: string;
        sell: string;
        buy: string;
        amount: number;
        rate: number;
      }

      export interface Request {
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: OrderI[];
      }
    }
  }

  export namespace Faq {
    export interface FaqData {
      id: number;
      title: string;
      body: string;
      coverImagePath: string;
    }

    export namespace GetFaqs {
      export interface Request {
        PageNumber: number;
        PageSize: number;
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        pageInfo: PageInfo;
        data: FaqData[];
      }
    }

    export namespace GetSingleFaq {
      export interface Request {
        id: string;
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: FaqData;
      }
    }

    export namespace PostFaq {
      export interface Request {
        Title: string;
        Body: string;
        token: string;
        CoverImage: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: null | string;
      }
    }

    export namespace UpdateFaq {
      export interface Request {
        id: string;
        Title: string;
        Body: string;
        token: string;
        CoverImage: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: null | string;
      }
    }

    export namespace DeleteFaq {
      export interface Request {
        id: string;
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: null | string;
      }
    }
  }

  export namespace Currencies {
    export interface CurrencyI {
      id: number;
      type: string;
      currency: string;
      buyRate: number;
      sellRate: number;
      processingFee: number;
      bankFeePercent: number;
      status: string;
      dateCreated: string;
      dateUpdated: string;
    }

    export namespace GetCurrencies {
      export interface Request {
        PageNumber: number;
        PageSize: number;
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: CurrencyI[];
        pageInfo: PageInfo;
      }
    }

    export namespace GetSingleCurrency {
      export interface Request {
        id: string;
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: CurrencyI;
      }
    }

    export namespace UpdateCurrency {
      export interface Request {
        id: string;
        token: string;
        type: string;
        currency: string;
        buyRate: number;
        sellRate: number;
        processingFee: number;
        bankFeePercent: number;
        status: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: string | null;
      }
    }

    export namespace GetDashboardCurrencies {
      interface DashboardCurrency {
        buyRate: number;
        sellRate: number;
        symbol: string;
      }

      export interface Request {
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: DashboardCurrency[];
      }
    }
  }

  export namespace Customers {
    export interface Customer {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      status: string;
      createdAt: string;
      lastLogin: null | string;
    }

    export interface Subscriber {
      name: string;
      createdAt: string;
    }

    export interface CustomerById {
      userId: number;
      name: string;
      registrationDate: string;
      phoneNumber: string;
      email: string;
      bvn: string;
    }

    export namespace GetCustomers {
      export interface Request {
        PageNumber: number;
        PageSize: number;
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: Customer[];
        pageInfo: PageInfo;
      }
    }

    export namespace GetCustomerById {
      export interface Request {
        id: string;
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: CustomerById;
      }
    }

    export namespace GetNewSubscribers {
      export interface Request {
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: Subscriber[];
      }
    }
  }

  export namespace Accounts{
    export interface Account{
      id: number;
      userId: number;
      currency: string;
      accountNo: string;
      accountName: string;
      bankName: string;
      bankCode: string;
      logo: string,
      status: boolean;
      dateCreated: Date;
      dateUpdated: Date;
    }

    export namespace GetAccounts {
      export interface AccountI{
        id: number;
        userId: number;
        currency: string;
        accountNo: string;
        accountName: string;
        bankName: string;
        bankCode: string;
        logo: string,
        status: boolean;
        dateCreated: Date;
        dateUpdated: Date;
      }
      export interface Request {
        token: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: Account[];
      }
    }

    export namespace AddAccount {
      export interface Request {
        id: number;
        userId: number;
        currency: string;
        accountNo: string;
        accountName: string;
        bankName: string;
        bankCode: string;
        logo: string,
        status: string;
        dateCreated: string;
        dateUpdated: string;
      }

      export interface Response extends Responses.BaseResponse {
        data: string | null;
      }
    }


  }
}

export default Api;
