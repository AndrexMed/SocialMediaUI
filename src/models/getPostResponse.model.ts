export interface Item {
    id: number;
    userId: number;
    date: string;
    description: string;
    image: string;
  }
  
  export interface ApiResponse {
    data: Item[];
  }
  
  // const exampleApiResponse: ApiResponse = {
  //   data: [
  //     {
  //       id: 0,
  //       userId: 0,
  //       date: "2023-12-22T19:28:23.292Z",
  //       description: "string",
  //       image: "string",
  //     }
  //   ]
  // };