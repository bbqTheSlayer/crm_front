const reducer = (
    state = {
        RegionDataSet: [],
        CityDataSet: [],
        DeliveryDataSet: [],
        PaymentDataSet: [],
        ProductList: [],

        Region: '',
        RegionID: '',
        City: '',
        CityID: '',
        Delivery: 0,
        DeliveryID: '',
        Street: '',
        StreetID: '',
        Building: '',
        BuildingID: '',
        Email: '',
        EmailID: '',
        Receiver: '',
        ReceiverID: '',
        Phone: '',
        PhoneID: '',
        Comment: '',
        CommentID: '',
        Payment: 0,
        PaymentID: '',

        ProductKey: '',
        ProductCount: 0,
        
        OrderKey: '',
        OrderValue: '',

        TotalCost: 0,

        ProductRemove: '',
    },
    action
) => {

    switch (action.type){
        case 'SET_STATE':
            state = action.payload;
            return state;
            
    default:
        return state;
    }
};

export default reducer;