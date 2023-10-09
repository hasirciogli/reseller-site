import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function MediaCard(props) {
    return (
        <Card className='flex flex-col w-fit min-h-[12rem]' style={{ backgroundColor: "transparrent", borderBottomLeftRadius: 0, borderBottomRightRadius: 0, }}>
            <CardContent className='bg-zinc-800 h-full'>
                <Typography gutterBottom variant="h5" component="div">
                    {props.tenga}
                </Typography>
                <Typography variant="body2" className='text-noxy-primary'>
                    {props.body}
                </Typography>
            </CardContent>
            <CardActions className='grid-flow-col grid-cols-2 text-noxy-primary bg-zinc-900 capitalize rounded-b-none border-b border-b-zinc-500'>
                {props.days.map((item, index) => {
                    return (
                        <>
                            <Link size="small" className='flex items-center justify-center text-xs text-center group min-w-[3rem] w-full'><span className='flex group-hover:hidden'>{item} day</span><span className='hidden group-hover:flex'>{props.prices[index]}  {props.currency}</span></Link>
                        </>
                    );
                })}
            </CardActions>
        </Card>
    );
}



export const HomePage = (props) => {
    return (
        <>
            <div className="text-lg text-noxy-primary font-black">
                Welcome back sir!
                <p className="text-sm text-zinc-400 font-light">
                    What do you wanna buy?
                </p>

                <div className='grid grid-cols-4 w-full mt-10 gap-4'>
                    <MediaCard tenga={
                        <>
                            <span className='text-noxy-primary'>Game</span><span class="text-[#95b806]">Sense</span>
                        </>
                    }
                        body={"Dominate the game with the private csgo cheat."}
                        days={[30, 90, 365, 9999]}
                        prices={[21, 63, 230, 2250]}
                        currency={"$"}
                    />

                    <MediaCard tenga={
                        <>
                            <span
                                class="text-noxy-primary font-bold ffonts-nunito">
                                NEVERLOSE<span class="text-[#0095b9]">.CC</span>
                            </span>
                        </>
                    }
                        body={"Best cheap/public cheat in the world"}
                        days={[30, 90, 180, 365]}
                        prices={[14, 35, 64, 108]}
                        currency={"€"}
                    />
                </div>
            </div>
        </>
    )
}