import { Fragment, useState, useRef } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const buy = [
    'Find my dream neighborhood',
    'Double your down payment',
    'Investigate your dream home',
    'Seize your dream home',
    'Find the best rate'

];

const own = ["Get upto $500,000 for your home equity"]
const sell = [
    "Get multiple offers & estimates for your home",
    "Sell a part of your home for upto $500,000",
    "Sell for lowest possible commissions",
    "Find strengths & weaknesses of your home",
    "Buy now, sell later"
];




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}





export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const buttonRef = useRef(null)
    const timeoutDuration = 200
    let timeout

    const closePopover = () => {
        return buttonRef.current?.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                bubbles: true,
                cancelable: true
            })
        )
    }

    const onMouseEnter = (open) => {
        clearTimeout(timeout)
        if (open) return
        return buttonRef.current?.click()
    }

    const onMouseLeave = (open) => {
        if (!open) return
        timeout = setTimeout(() => closePopover(), timeoutDuration)
    }


    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex pr-14">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Home</span>
                        <img className="h-10 w-auto" src="https://home.llc/assets/images/logo.png" alt="Home" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12 ">

                    <Popover className="relative">
                        {({ open }) => {
                            return (
                                <>
                                    <div onMouseLeave={onMouseLeave.bind(null, open)}>
                                        <Popover.Button
                                            ref={buttonRef}
                                            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                                            onMouseEnter={onMouseEnter.bind(null, open)}
                                            onMouseLeave={onMouseLeave.bind(null, open)}
                                        >
                                            Buy
                                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                        </Popover.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-5 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-1xl">
                                                <div
                                                    className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 w-80"
                                                    onMouseEnter={onMouseEnter.bind(null, open)}
                                                    onMouseLeave={onMouseLeave.bind(null, open)}
                                                >
                                                    <ul className="relative flex flex-col bg-white">
                                                        {buy.map((item) => (
                                                            <li
                                                                key={item}
                                                                className="  flex items-center gap-x-6 rounded-lg p-4 text-sm leading-0 hover:bg-gray-50"
                                                            >
                                                                <div className="flex-auto">
                                                                    <p className="text-gray-600">{item}</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </div>
                                </>
                            )
                        }}
                    </Popover>


                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Features
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Marketplace
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Company
                    </a>


                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Home</span>
                            <img
                                className="h-8 w-auto"
                                src="https://home.llc/assets/images/logo.png"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                                                Buy
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[...buy].map((item) => (
                                                    <Disclosure.Button
                                                        key={item}
                                                        as="a"
                                                        href={item}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                    >
                                                        {item}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Features
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Marketplace
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Company
                                </a>
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}