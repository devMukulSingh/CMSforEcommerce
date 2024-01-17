"use client"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Store } from "@prisma/client"
import { ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { Button } from "./ui/button"
import { useState } from "react"
import { setDialog } from "@/store/slice"
import { useAppDispatch } from "@/store/hooks"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps{
  items: Store[]
}

const StoreSwitcher = ({ items = []} ) => {

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const formattedItems = items.map( (item) => ({
    label : item.name,
    value : item.id
  }));

  const currentStore = formattedItems.find( (item) => item.value === params.storeId)
  const onStoreSelect = ( store : { label : string, value:string}) => {

  }

  return (
    <main>
      <Popover open={open}  >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded = {open}
          aria-label="Select a store"
          className="w-52 justify-between "
          onClick={ () => setOpen(true)}
        >
          <StoreIcon/>
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto opacity-50"/>
        </Button>
        </PopoverTrigger>

        <PopoverContent>
          <Command>
            <CommandInput placeholder="Search Store..."/>
              <CommandList>
                <CommandEmpty>No Store found</CommandEmpty>
                <CommandGroup>
                  {
                    formattedItems.map( (store) => 
                      <CommandItem key={store.value}
                        onSelect = { () => onStoreSelect(store)}
                      >
                        {store.label}
                      </CommandItem>
                    )

                  }

                </CommandGroup>
              </CommandList>
              <CommandSeparator/>
              <CommandGroup>
                <CommandItem
                 onSelect={ () => {
                  setOpen(false);
                  dispatch( setDialog())
                 }}
                 className="cursor-pointer"
                >
                  <PlusCircle className="mr-3"/>
                  Create Store
                </CommandItem>
              </CommandGroup>
            </Command>

        </PopoverContent>
      </Popover>
      </main>
  )
}

export default StoreSwitcher