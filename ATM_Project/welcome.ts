import chalkAnimation from "chalk-animation";

const sleep = () => {
    return new Promise((resolve)=> {
        setTimeout(resolve, 2000);
    });
};

async function welcome() {
    let title = chalkAnimation.neon(`             ATM\n`);
    await sleep();
    title.stop();
};

export { sleep, welcome };