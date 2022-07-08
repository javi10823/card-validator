import { Noop } from "react-hook-form";
import { CardTypes } from "../../../types/cardTypes";

export type CardFieldProps = {
    value: string;
    onChange: (value: string, cardType: CardTypes | null, cardLength: number) => void
    onBlur: Noop;
    error?: boolean;
}