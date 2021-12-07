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
    background: var(--color-red-crayola);
    height: 120px;
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Qoute = styled.p`
    text-align: center;
    margin: 0 20px;
    font-size: 26px;
`;
const Author = styled.p`
    text-align: end;
    margin: 5px 20px;
    font-size: 20px;
`;
export default RandomQuote;