const func = {

    disableClick: function(e: any){
        const disabledElements = [
            //home click
            "app-title"
            //other pages
        ]

        if(disabledElements.includes(e.target.className)){
            e.stopPropagation();
            e.preventDefault();            
        }

    }

    

}

export default func;