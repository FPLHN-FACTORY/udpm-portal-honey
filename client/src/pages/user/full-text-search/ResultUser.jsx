import { Avatar, Button, List } from "antd";

const ResultUser = (props) => {
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ width: "60px", height: "60px" }}
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.content}
            />
            <Button
              className="rounded-3xl border-black bg-black px-4 py-2 text-white h-9 w-16 leading-2"
              style={{
                borderRadius: "30px",
              }}
            >
              Follow
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};
export default ResultUser;
