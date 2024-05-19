import { category } from "@query/api";
import { query } from "@query/index";

export default async () => {
    const result = await query(category);
    const { list=[] } = result || {};
    return {
        categorys:list
    }
    
}