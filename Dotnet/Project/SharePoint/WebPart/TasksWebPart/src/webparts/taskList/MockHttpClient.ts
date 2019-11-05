import { ISPList } from "./TaskListWebPart";

export default class MockHttpClient  {

   private static _items: ISPList[] = [];

   public static get(): Promise<ISPList[]> {
   return new Promise<ISPList[]>((resolve) => {
           resolve(MockHttpClient._items);
       });
   }
}