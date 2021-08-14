import React from 'react'
import { Card, CardContent, Typography} from "@material-ui/core"

function InfoBox({title, cases, total}) {
    return (
        <Card className= "infoBox">
            <Typography color='textSecondary'>{title}</Typography>
            <Typography><h2  className="infoBox_cases">{cases}</h2></Typography>
            <Typography className="infoBox_total" color= "textSecondary">{total} Total</Typography>
        </Card>
    )
}

export default InfoBox
