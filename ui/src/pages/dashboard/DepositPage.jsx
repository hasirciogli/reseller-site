import React, { useState, useEffect } from 'react';
import { CreatePaparaPayment, GetPaymentStatus } from '../../api/PaymentApi';
import toast from 'react-hot-toast';

export const DepositPage = () => {
    const [depositPrice, setDepositPrice] = useState(1);
    const [paymentId, setPaymentId] = useState(null);
    const [paymentResponse, setPaymentResponse] = useState("waiting");
    const [depositBtnActive, setDepositBtnActive] = useState(true);

    const handleChangeDepositPrice = (event) => {
        if (!paymentId) {
            const price = event.target.value;
            setDepositPrice(Math.max(1, price));
        }
    }

    const statusCheck = async () => {
        try {
            const pstatus = await GetPaymentStatus(paymentId);
            setPaymentResponse(pstatus.pstatus);

            if (pstatus.pstatus === "approved") {
                setPaymentId(null);
                setDepositBtnActive(true);
                setPaymentResponse("waiting");
                toast.success("Payment completed, " + depositPrice + " ₺ added your balance");
            }
        } catch (error) {
            console.error("Payment status check failed:", error);
        }
    }

    const createPayment = async () => {
        try {
            const pstatus = await CreatePaparaPayment(depositPrice);

            if (pstatus.status) {
                setPaymentId(pstatus.payment_id);
                toast.success("Payment created, you can proceed with the payment.");
            } else {
                setPaymentId(null);
                setDepositBtnActive(true);
                toast.error("Payment creation failed. Please try again later.");
            }
        } catch (error) {
            console.error("Payment creation failed:", error);
        }
    }

    const handleDepositBtn = () => {
        if (depositBtnActive) {
            setDepositBtnActive(false);
            createPayment();
        }
    }

    useEffect(() => {
        const worker = async () => {
            if (paymentId != null) {
                await statusCheck();
                console.log("Payment status checked.");
            }
        }

        const id = setInterval(worker, 5500);

        return () => {
            clearInterval(id);
        }
    }, [paymentId]);

    return (
        <div className="flex flex-row justify-center text-lg text-noxy-primary font-light ffonts-nunito">
            <div className='w-[10rem]'>
                <label className='text-xs'>Payment Method</label>
                <select className='bg-transparent border-zinc-800 border rounded text-noxy-primary p-2 w-full font-light ffonts-nunito'>
                    <option value="papara" className='bg-zinc-800' selected>Papara</option>
                </select>

                <div className="relative mb-3 mt-3" data-te-input-wrapper-init>
                    <label className='text-xs'>Deposit Fund [TRY]</label>
                    <input
                        value={depositPrice}
                        onChange={handleChangeDepositPrice}
                        type="text"
                        className='bg-transparent border-zinc-800 border rounded text-noxy-primary font-light ffonts-nunito p-2 w-full'
                        id="exampleFormControlInput1"
                        placeholder="Example label" />
                </div>

                {depositBtnActive &&
                    <div onClick={handleDepositBtn} className='w-full bg-zinc-800 font-light ffonts-nunito hover:bg-green-700 rounded duration-300 hover:cursor-pointer py-3 px-4 flex items-center justify-center'>
                        Create Payment
                    </div>
                }
            </div>

            <div className='w-[20rem] h-fit px-3'>
                {!paymentId ?
                    <>
                        <div className="flex capitalize text-xl text-noxy-primary font-light ffonts-nunito w-full justify-center mt-2">
                            Create a Deposit
                        </div>
                        <div className="flex capitalize text-sm text-zinc-300 font-light ffonts-nunito w-full justify-center -mt-1">
                            and proceed with the payment
                        </div>
                    </>
                    :
                    <>
                        <div className="flex flex-col capitalize text-md text-noxy-primary ffonts-nunito font-light w-full mt-2">
                            <span className='font-normal'>Send to our PAPARA account</span>
                        </div>

                        <div className="flex flex-col capitalize text-md text-noxy-primary ffonts-nunito font-light w-full mt-2">
                            <span className='font-normal'>Transfer amount:</span> <p className='text-nunito text-xs bg-gray-800 rounded-md p-2'><strong>₺ {depositPrice}</strong></p>
                        </div>

                        <div className="flex flex-col capitalize text-md text-noxy-primary ffonts-nunito font-light w-full mt-2">
                            <span className='font-normal'>Transfer to:</span> <p className='text-nunito text-xs bg-gray-800 rounded-md p-2'><strong>1216738278</strong></p>
                        </div>

                        <div className="flex flex-col text-md text-noxy-primary ffonts-nunito font-light w-full mt-2">
                            <span className='font-normal'>And add to description:</span> <p className='lowercase text-nunito text-xs bg-gray-800 rounded-md p-2'>{paymentId}</p>
                        </div>

                        <div className="flex flex-col text-md text-noxy-primary ffonts-nunito font-light w-full mt-4">
                            <p className='text-nunito text-sm rounded-md'>
                                The payment will be completed automatically, and the money will be transferred to your account.
                            </p>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default DepositPage;
