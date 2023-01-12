import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { Client } from "@xmtp/xmtp-js";
import { useCallback, useMemo, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@wallet01/react";

type ChatViewProps = {
  walletAddress: string;
};

export default function ChatView({ walletAddress }: ChatViewProps) {
  const [isXmtpClient, setIsXmtpClient] = useState<boolean>(false);
  const [isNotOnNetwork, setIsNotOnNetwork] = useState<boolean>(false);
  const { address: userAddress } = useWallet();

  const provider: ethers.providers.Web3Provider | undefined = useMemo(() => {
    if (window?.ethereum) {
      return new ethers.providers.Web3Provider(window.ethereum);
    }
  }, []);

  const signer: any = useMemo(() => {
    if (!userAddress || !provider) return;
    return provider.getSigner();
  }, [provider, userAddress]);

  const conversation = useCallback(async () => {
    if (!walletAddress) return;
    try {
      const xmtp = await Client.create(signer);
      if (xmtp) {
        setIsXmtpClient(true);
      }
      const conversation = await xmtp.conversations.newConversation(
        walletAddress
      );
      return conversation;
    } catch (e: any) {
      setIsXmtpClient(false);
      console.log(e);
      if (e.message.includes("not on the XMTP network")) {
        setIsNotOnNetwork(true);
      }
    }
  }, [signer, walletAddress]);

  const messages = useCallback(async () => {
    const newConversations = await conversation();
    if (!newConversations) return;
    const messages = await newConversations.messages().then(response => { response });
    return messages;
  }, []);

  async function sendMessage(textContent: string) {
    const newConversations = await conversation();
    if (!newConversations) return;
    const sendMessage = newConversations.send(textContent);
    return sendMessage;
  }

  return (
    <div>
      {!isXmtpClient && (
        !isNotOnNetwork ? 
        <button
          onClick={() => conversation()}
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        > Start Conversation with {walletAddress}
        </button> : 
        <div
          className="flex px-4 py-2 w-24"
        > {walletAddress} is not on the network. You cannot chat with them via chat at the moment
        </div>)}
        {isXmtpClient && <div
          style={{
            position: "relative",
            height: "700px",
            marginLeft: "5%",
            width: "100%",
          }}
        >
          <MainContainer>
            <ChatContainer>
              <MessageList>
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                sendButton={true}
                onSend={(textContent) => {
                  sendMessage(textContent);
                }}
              />
            </ChatContainer>
          </MainContainer>
        </div>}
    </div>
  );
}
