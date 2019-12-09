export class CalculateHelper {

    static generateFibonacciNew(data:Array<any>):Array<any>{

        data.reverse();


        data.forEach(function(element, index){
            if(index<data.length-13){
                let price13 = 0;
                for(let i = 0; i < 13; i++){
                    price13 += data[index+i][2];
                }
                data[index][9] = price13/13;
            }

            if(index<data.length-34){
                let price34 = 0;
                for(let i = 0; i < 34; i++){
                    price34 += data[index+i][2];
                }
                data[index][10] = price34/34;
            }
            if(index<data.length-55){
                let price55 = 0;
                for(let i = 0; i < 55; i++){
                    price55 += data[index+i][2];
                }
                data[index][11] = price55/55;
            }

            if(index<data.length-144){
                let price144 = 0;
                for(let i = 0; i < 144; i++){
                    price144 += data[index+i][2];
                }
                data[index][12] = price144/144;
            }
        });

        return data;
    }


    static generateFibonacci(data:object):object{
        data['mashData'].forEach(function(element, index){
            if(index<data['mashData'].length-13){
                let price13 = 0;
                for(let i = 0; i < 13; i++){
                    price13 += data['mashData'][index+i].kline.close;
                }
                data['mashData'][index].ma13 = price13/13;
            }

            if(index<data['mashData'].length-34){
                let price34 = 0;
                for(let i = 0; i < 34; i++){
                    price34 += data['mashData'][index+i].kline.close;
                }
                data['mashData'][index].ma34 = price34/34;
            }
            if(index<data['mashData'].length-55){
                let price55 = 0;
                for(let i = 0; i < 55; i++){
                    price55 += data['mashData'][index+i].kline.close;
                }
                data['mashData'][index].ma55 = price55/55;
            }

            if(index<data['mashData'].length-144){
                let price144 = 0;
                for(let i = 0; i < 144; i++){
                    price144 += data['mashData'][index+i].kline.close;
                }
                data['mashData'][index].ma144 = price144/144;
            }
        });

        return data;
    }
}