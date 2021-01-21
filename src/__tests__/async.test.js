import React, { useEffect, useState } from "react";
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

const Fetchy = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // simulate a fetch
    setTimeout(() => {
      setData([1, 2, 3]);
    }, 3000);
  }, []);

  return (
    <div>
      <h2>Fetchy</h2>
      <div>
        {data.length ? (
          <div>
            <h3>Data:</h3>
            {data.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

describe.skip("Fetchy", () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it("shows Loading", async () => {
        render(<Fetchy />);

        screen.debug();
        expect(screen.getByText("Loading")).toBeInTheDocument();

        jest.advanceTimersByTime(3000);

        screen.debug();
        expect(screen.getByText("Data:")).toBeInTheDocument();
    });
});