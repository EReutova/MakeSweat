import React, {useEffect, useState} from "react";
import styled from "styled-components";

const RandomQuote = () => {
    const [quote, setQuote] = useState({});

    useEffect(() => {
        fetch('/motivating-quote')
        .then(res => res.json())
        .then(data => {
            setQuote(data.data);
        })
        .catch((err) => {
            console.log(err);
		});
    }, []);


    return(
        <Wrapper>
            {
                quote && 
                    <>
                        <Qoute>"{quote.quote}"</Qoute>
                        {
                            quote.author !== "Unknown" &&
                                <Author>{quote.author}</Author>
                        }
                    </>
                
            }
        </Wrapper>
    )
}
const Wrapper = styled.div`
    background: rgba(247, 46, 76, 0.85);
    color: #fff;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Qoute = styled.p`
    text-align: center;
    margin: 0 20px;
    font-size: 24px;
    font-family: 'Paytone One', sans-serif;
`;
const Author = styled.p`
    text-align: end;
    margin: 5px 40px;
    margin-left: auto;
    font-size: 20px;
    font-family: 'Paytone One', sans-serif;
`;
export default RandomQuote;