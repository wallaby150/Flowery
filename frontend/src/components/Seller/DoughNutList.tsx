import React, { useState, useEffect } from "react";
import styles from "./SalesList.module.scss";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { storeId, storeInfo } from "../../recoil/atom";
import DonutChart from "./DonutChart";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import DatePicker from "./DatePicker";

export default function SalesList() {
  const myStoreId = useRecoilValue(storeId);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showing, setShowing] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  function handleState(date: number) {
    if (date === 7) {
      setShowing(false);
      setStartDate(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000));
      setEndDate(new Date());
    } else if (date === 30) {
      setShowing(false);
      setStartDate(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000));
      setEndDate(new Date());
    } else if (date === 99) {
      if (!showing) {
        handleShow();
      }
    }
  }

  function handleShow() {
    setShowing(!showing);
  }
  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <div className="flex justify-between w-[100%]">
          <p className={styles.font1}>판매 비율</p>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                style={{ height: "1.2rem" }}
              >
                기간 설정
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-[6rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => handleState(7)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        최근 7일
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => handleState(30)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        최근 30일
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => handleState(99)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        직접 입력
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        {showing && (
          <div>
            <DatePicker />
          </div>
        )}
        <div className="w-[100%] h-[60vh] flex justify-center">
          <DonutChart startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </div>
  );
}
