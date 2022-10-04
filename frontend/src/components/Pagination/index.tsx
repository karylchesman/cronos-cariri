import { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { Container } from './styles';
import { Button } from '@chakra-ui/react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

interface IPaginationProps {
    registers: number;
    setPage: (page: number) => void;
    actualPage: number;
    registersPerPage: number;
}

const Pagination = ({ registers, actualPage, setPage, registersPerPage }: IPaginationProps) => {

    const theme = useTheme();
    const [pages, setPages] = useState(1);

    const calcPages = (qtd_registers: number, perPage: number) => {
        let value = qtd_registers / perPage;

        if (Number.isInteger(value) && value > 0) {
            return value;
        } else {
            value = Math.floor(value) + 1;

            return value;
        }
    }

    const changePage = (page: number | "next" | "previous") => {
        if (typeof page === "number") {
            setPage(page);
        } else {
            switch (page) {
                case "next":
                    () => {
                        let new_page = actualPage + 1;

                        if (new_page > pages) return;

                        setPage(new_page)
                    }
                case "previous":
                    () => {
                        let new_page = actualPage - 1;

                        if (new_page < pages) return;

                        setPage(new_page)
                    }
            }
        }
    }

    useEffect(() => {
        setPages(calcPages(registers, registersPerPage));
    }, [registers, registersPerPage])

    return (
        <Container>
            {
                actualPage > 2 &&
                <>
                    <span className="handle-page" onClick={() => changePage(actualPage - 1)}>
                        <MdArrowBackIosNew />
                    </span>
                    <HiOutlineDotsHorizontal />
                </>
            }

            {
                actualPage > 1 &&
                <Button colorScheme="gray" size='xs' onClick={() => changePage(actualPage - 1)}>
                    {actualPage - 1}
                </Button>
            }

            <Button
                bgColor={theme.colors.main}
                color="#FFF"
                size='xs'
                _hover={{
                    backgroundColor: `${theme.colors.main}ee`
                }}
            >
                {actualPage}
            </Button>

            {
                (pages > 1 && actualPage < pages) &&
                <Button colorScheme="gray" size='xs' onClick={() => changePage(actualPage + 1)}>
                    {actualPage + 1}
                </Button>
            }

            {
                (pages > 2 && actualPage < pages) &&
                <>
                    <HiOutlineDotsHorizontal />
                    <span className="handle-page" onClick={() => changePage(actualPage + 1)}>
                        <MdArrowForwardIos />
                    </span>
                </>
            }
        </Container>
    );
}

export { Pagination };
