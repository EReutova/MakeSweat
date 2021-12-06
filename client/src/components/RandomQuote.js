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

`;
const Qoute = styled.p``;
const Author = styled.p``;
export default RandomQuote;