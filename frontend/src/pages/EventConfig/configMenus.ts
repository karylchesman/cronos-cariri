import { IconType } from "react-icons/lib";
import { IoNewspaperOutline, IoSettings } from 'react-icons/io5';
import { GoTasklist } from 'react-icons/go';
import { BsFillImageFill } from 'react-icons/bs';
import { MdCategory, MdPayments } from 'react-icons/md';
import { BiCollection } from 'react-icons/bi';
import { RiCoupon2Fill } from 'react-icons/ri';
import { CgPlayListAdd } from 'react-icons/cg';
import { AiFillTags } from "react-icons/ai";

export interface IConfigMenuItem {
    title: string;
    Icon: IconType;
}

export const configMenus: IConfigMenuItem[] = [
    {
        title: "Dados do Evento",
        Icon: GoTasklist
    },
    {
        title: "Detalhes da Página",
        Icon: IoNewspaperOutline
    },
    {
        title: "Banner e Capa",
        Icon: BsFillImageFill
    },
    {
        title: "Parametros",
        Icon: IoSettings
    },
    {
        title: "Categorias",
        Icon: MdCategory
    },
    {
        title: "Planos",
        Icon: MdPayments
    },
    {
        title: "Lotes",
        Icon: BiCollection
    },
    {
        title: "Tags do Evento",
        Icon: AiFillTags
    },
    {
        title: "Cupons",
        Icon: RiCoupon2Fill
    },
    {
        title: "Campos Complementares",
        Icon: CgPlayListAdd
    },
]