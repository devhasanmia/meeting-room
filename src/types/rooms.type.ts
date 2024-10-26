export type TRoomProps = {
    _id: string;
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string[];
};

export type TRoomsProps = {
    _id: string;
    name: string;
    roomNo: string;
    floorNo: string;
    capacity: string;
    pricePerSlot: string;
    amenities: string[];
};