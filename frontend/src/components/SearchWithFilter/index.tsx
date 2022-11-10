import { useRef } from 'react';
import { Box, Button, Input, InputGroup, InputRightElement, Tag, TagCloseButton, TagLabel, TagRightIcon } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { GoSettings } from 'react-icons/go';
import { IoText } from 'react-icons/io5';
import { Container, FilterInput } from './styles';
import { SearchObject } from '../../utils/search-object';
import { ChooseFilterModal } from '../ChooseFilterModal';
import { useModalControl } from '../../hooks/useModalControl';
import { IoMdAdd } from 'react-icons/io';

interface ISearchWithFilterProps {
    onChangeFilter: (data: any) => void;
    onEnterPress: () => void;
    onSearchTypeChange: (value: "text" | "filter") => void;
    searchValue: SearchObject<any>[] | string;
    filterOptions: { alias: string, key: string }[];
}

const SearchWithFilter = ({ onChangeFilter, onEnterPress, searchValue, onSearchTypeChange, filterOptions }: ISearchWithFilterProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [showChooseFilterModal, chooseFilterModalData, turnChooseFilterModal] = useModalControl<SearchObject<any>>();

    return (
        <Container>
            {
                typeof searchValue === "string" ?
                    <>
                        <InputGroup size='md'>
                            <Input
                                ref={inputRef}
                                pr='4.5rem'
                                type="text"
                                placeholder='Digite algo para procurar...'
                                onChange={(event) => {
                                    let value = event.target.value;
                                    onChangeFilter(value);
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        onEnterPress()
                                    }
                                }}
                            />
                            <InputRightElement width='6.5rem' gap={1}>
                                <Button h='1.75rem' size='sm' colorScheme="messenger" onClick={onEnterPress}>
                                    <BsSearch color="#FFF" />
                                </Button>
                                <Button h='1.75rem' size='sm' colorScheme="gray" onClick={() => onSearchTypeChange("filter")}>
                                    <GoSettings />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </>
                    :
                    <FilterInput>
                        <div className="filters" onClick={() => turnChooseFilterModal()}>
                            {
                                typeof searchValue !== "string" &&
                                <>
                                    {
                                        searchValue.length > 0 &&
                                        searchValue.map((item, idx) => {
                                            return <Tag
                                                size="sm"
                                                key={idx}
                                                borderRadius='full'
                                                variant='solid'
                                                colorScheme='gray'
                                                onClick={(target) => {
                                                    target.stopPropagation()
                                                    onChangeFilter(item)
                                                    turnChooseFilterModal(item)
                                                }}
                                            >
                                                <TagLabel>{item.alias} {item.operator} {item.value}</TagLabel>
                                                <TagCloseButton onClick={(target) => {
                                                    target.stopPropagation()
                                                    onChangeFilter(item)
                                                }} />
                                            </Tag>
                                        })
                                    }
                                    <Tag
                                        size="sm"
                                        borderRadius='full'
                                        variant='outline'
                                        colorScheme='twitter'
                                        onClick={(target) => {
                                            target.stopPropagation()
                                            turnChooseFilterModal()
                                        }}
                                    >
                                        <TagLabel>Adicionar filtro</TagLabel>
                                        <TagRightIcon as={IoMdAdd} />
                                    </Tag>
                                </>
                            }
                        </div>
                        <div className="buttons">
                            <Button h='1.75rem' size='sm' colorScheme="messenger" onClick={onEnterPress}>
                                <BsSearch color="#FFF" />
                            </Button>
                            <Button h='1.75rem' size='sm' colorScheme="gray" onClick={() => onSearchTypeChange("text")}>
                                <IoText />
                            </Button>
                        </div>
                    </FilterInput>
            }

            <ChooseFilterModal
                isOpen={showChooseFilterModal}
                onChoose={(value) => onChangeFilter(value)}
                turnModal={() => {
                    turnChooseFilterModal();
                }}
                filterOptions={filterOptions}
                filterToEdit={chooseFilterModalData}
            />
        </Container>
    );
}

export { SearchWithFilter };
