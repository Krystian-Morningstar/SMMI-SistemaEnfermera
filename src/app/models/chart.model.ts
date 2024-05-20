export interface grafico{
    type: string,
    data: {// values on X-Axis
        labels: [], 
	       datasets: [
            {
                label: string,
                data: [],
                backgroundColor: string
            }  
        ] 
    }
}