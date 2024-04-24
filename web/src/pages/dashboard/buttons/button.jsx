import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Button = ({ title, list, selected, onSelectionChange }) => {
  const [selectedItem, setSelectedItem] = useState(list[0]);  // Default to the first item or use null if no default

  const handleSelection = (item) => {
    setSelectedItem(item);
    if (onSelectionChange) {
      onSelectionChange(item);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left mr-4">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {title}: {selected.name}
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
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-scroll max-h-60">
          <div className="py-1">
            {list.map((item) => (
              <Menu.Item key={item.id}>
                {({ active }) => (
                  <button
                    type="button"
                    className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm')}
                    onClick={() => handleSelection(item)}
                  >
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Button;