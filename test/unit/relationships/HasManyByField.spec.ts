import { AttrField, HasManyByField, NumberField, StringField } from "@/attributes";
import { describe, expect, it } from "vitest";
import { HasManyBy, Model } from "@vuex-orm/core";
import { ORMDatabase } from "@/database";
import { OrmModel } from "@/model";
import { Store } from "vuex";

describe("HasManyByField", () => {
    it("can define the property as a `Has Many By` relationship field", () => {
        @OrmModel("nodes")
        class Node extends Model {
            @NumberField() id!: number;

            @StringField() name!: string;
        }

        @OrmModel("clusters")
        class Cluster extends Model {
            @NumberField() id!: number;

            @AttrField() node_ids!: number[];

            @HasManyByField(Node, "node_ids") nodes!: Node;
        }

        new Store({
            plugins: [ORMDatabase.install()],
        });

        Cluster.insert({
            data: {
                id: 1,
                nodes: [
                    { id: 1, name: "Node 1" },
                    { id: 2, name: "Node 2" },
                    { id: 3, name: "Node 3" },
                ],
            },
        });

        const field = Cluster.getFields().nodes as HasManyBy;

        expect(field).toBeInstanceOf(HasManyBy);

        expect(field.parent).toBe(Node);
        expect(field.foreignKey).toBe("node_ids");
        expect(field.ownerKey).toBe("id");

        const cluster = Cluster.query().with("nodes").first();

        expect(cluster?.nodes).toEqual([
            { $id: "1", id: 1, name: "Node 1" },
            { $id: "2", id: 2, name: "Node 2" },
            { $id: "3", id: 3, name: "Node 3" },
        ]);

        expect(cluster?.nodes[0]).toBeInstanceOf(Node);
        expect(Node.all()).toHaveLength(3);
        expect(Cluster.all()).toHaveLength(1);
    });
});
