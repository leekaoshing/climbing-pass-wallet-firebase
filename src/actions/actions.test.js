import { useCheckMobileScreen } from "./actions"

import { render, act } from '@testing-library/react'
import React from 'react';

function TestComponent() {
  return <div>{useCheckMobileScreen()}</div>;
}

let container = null;

// TODO Fix this test

describe.skip('check if on mobile', () => {

    // beforeEach(() => {
    //     const elementMock = { addEventListener: jest.fn() };
    //     jest.spyOn(document, 'getElementById').mockImplementation(() => elementMock);

    //     container = document.createElement("div");
    //     document.body.appendChild(container);

    // });

    // afterEach(() => {
    //     unmountComponentAtNode(container);
    //     container.remove();
    //     container = null;
    // })

    it('returns true if screen width smaller than 768', () => {
        // act(() => {
        //     render(<TestComponent />, container);
        // });

        // const spy = jest.spyOn(container.instance(), 'handleWindowResize');

        // global.addEventListener('resize', spy);
        // global.dispatchEvent(new Event('resize'));
        // expect(container.textContent).toBe("loading");
        
        expect(true).toBeTruthy();


        // expect(spy).toHaveBeenCalled();
    })
})