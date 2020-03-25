import styled from "styled-components";
import { tablet, mobile } from "./mediaQueries";

export const Wrapper = styled.div`
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  padding-bottom: 50px;

  ${tablet} {
    width: 96%;
  }
`;

export const Title = styled.h1`
  color: ${props => props.theme.titleText};
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 24px;
  margin-bottom: 26px;
`;

export const SubWrapper = styled.div`
  color: ${props => props.theme.titleText};
  display: flex;
  align-items: center;
`;

export const FormWrapper = styled.form`
  flex-wrap: wrap;
  display: flex;
  background: ${props => props.theme.backgroundSecondary}
  justify-content: center;

  ${mobile} {
  }
`;
