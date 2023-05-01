import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import roboPunksNFT from './RoboPunksNFT.json';

const roboPunksNFTAddress = '0xA0AD9656d5c387B16ac3D1690c742b5f46bc7caE';

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      roboPunksNFTAddress,
      roboPunksNFT.abi,
      signer
    );
    try {
      const response = await contract.mint(BigNumber.from(mintAmount), {
        value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
      });
      console.log('response: ', response);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  const hanldeDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const hanldeIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify='center' align='center' height='100vh' paddingBottom='150px'>
      <Box width='520px'>
        <div>
          <Text fontSize='40px' textShadow='0 5px #000000'>
            RoboPunks
          </Text>
          <Text
            fontSize='30px'
            letterSpacing='-5.5%'
            fontFamily='VT323'
            textShadow='0 2px 2px #000000'
          >
            It's 2078. Can the RoboPunks NFT save humans from destructive
            rampant NFT speculation? Mint Robopunks to find out.
          </Text>
        </div>
        {isConnected ? (
          <div>
            <Flex justify='center' align='center'>
              <Button
                backgroundColor='#D6517D'
                borderRadius='5px'
                boxShadow='0px 2px 2px 1px #0F0F0F'
                color='white'
                cursor='pointer'
                fontFamily='inherit'
                padding='15px'
                marginTop='10px'
                onClick={hanldeDecrement}
              >
                -
              </Button>
              <Input
                readOnly
                fontFamily='inherit'
                width='100px'
                height='40px'
                textAlign='center'
                paddingLeft='19px'
                marginTop='10px'
                type='number'
                value={mintAmount}
              />
              <Button
                backgroundColor='#D6517D'
                borderRadius='5px'
                boxShadow='0px 2px 2px 1px #0F0F0F'
                color='white'
                cursor='pointer'
                fontFamily='inherit'
                padding='15px'
                marginTop='10px'
                onClick={hanldeIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor='#D6517D'
              borderRadius='5px'
              boxShadow='0px 2px 2px 1px #0F0F0F'
              color='white'
              cursor='pointer'
              fontFamily='inherit'
              padding='15px'
              marginTop='10px'
              onClick={handleMint}
            >
              MINT NOW
            </Button>
          </div>
        ) : (
          <Text
            marginTop='70px'
            fontSize='30px'
            letterSpacing='-5.5%'
            fontFamily='VT323'
            textShadow='0 3px #000000'
            color='#D6517D'
          >
            You must connect to Mint.
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
